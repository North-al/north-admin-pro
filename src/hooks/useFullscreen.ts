import { useSettingsStore } from '../store/modules/settings'

// 全局状态，确保所有实例共享同一个状态
const globalFullscreenState = {
    isSupported: ref(false),
    isFullscreen: ref(false),
    initialized: ref(false)
}

/**
 * 全屏管理Hook
 * 提供全屏切换、全屏状态检测等功能
 */
export function useFullscreen() {
    const settingsStore = useSettingsStore()

    // 使用全局状态
    const isSupported = globalFullscreenState.isSupported
    const isFullscreen = globalFullscreenState.isFullscreen

    // 检查全屏支持
    const checkSupport = () => {
        const standardSupported = 'fullscreenEnabled' in document && document.fullscreenEnabled
        const webkitSupported = 'webkitFullscreenEnabled' in document && (document as any).webkitFullscreenEnabled
        const mozSupported = 'mozFullScreenEnabled' in document && (document as any).mozFullScreenEnabled
        const msSupported = 'msFullscreenEnabled' in document && (document as any).msFullscreenEnabled

        // 检查requestFullscreen方法是否存在
        const hasRequestMethod = !!(
            document.documentElement.requestFullscreen ||
            (document.documentElement as any).webkitRequestFullscreen ||
            (document.documentElement as any).mozRequestFullScreen ||
            (document.documentElement as any).msRequestFullscreen
        )

        const supported = standardSupported || webkitSupported || mozSupported || msSupported || hasRequestMethod
        isSupported.value = supported
        return supported
    }

    // 更新全屏状态
    const updateFullscreenStatus = () => {
        const newStatus = !!(
            document.fullscreenElement ||
            (document as any).webkitFullscreenElement ||
            (document as any).mozFullScreenElement ||
            (document as any).msFullscreenElement
        )
        isFullscreen.value = newStatus
        settingsStore.setFullscreen(newStatus)
    }

    // 进入全屏
    const enterFullscreen = async (element?: HTMLElement | Element) => {
        if (!isSupported.value) {
            return false
        }

        const targetElement = element || document.documentElement

        try {
            if (targetElement.requestFullscreen) {
                await targetElement.requestFullscreen()
            } else if ((targetElement as any).webkitRequestFullscreen) {
                await (targetElement as any).webkitRequestFullscreen()
            } else if ((targetElement as any).mozRequestFullScreen) {
                await (targetElement as any).mozRequestFullScreen()
            } else if ((targetElement as any).msRequestFullscreen) {
                await (targetElement as any).msRequestFullscreen()
            } else {
                return false
            }
            return true
        } catch (error) {
            console.error('Failed to enter fullscreen:', error)
            return false
        }
    }

    // 退出全屏
    const exitFullscreen = async () => {
        if (!isFullscreen.value) return false

        try {
            if (document.exitFullscreen) {
                await document.exitFullscreen()
            } else if ((document as any).webkitExitFullscreen) {
                await (document as any).webkitExitFullscreen()
            } else if ((document as any).mozCancelFullScreen) {
                await (document as any).mozCancelFullScreen()
            } else if ((document as any).msExitFullscreen) {
                await (document as any).msExitFullscreen()
            }
            return true
        } catch (error) {
            console.error('Failed to exit fullscreen:', error)
            return false
        }
    }

    // 切换全屏
    const toggleFullscreen = async (element?: HTMLElement | Element) => {
        if (isFullscreen.value) {
            return await exitFullscreen()
        } else {
            return await enterFullscreen(element)
        }
    }

    // 监听全屏变化事件
    const handleFullscreenChange = () => {
        updateFullscreenStatus()
    }

    // 监听键盘事件（ESC退出全屏）
    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isFullscreen.value) {
            exitFullscreen()
        }
    }

    const init = () => {
        // 防止重复初始化
        if (globalFullscreenState.initialized.value) {
            return
        }

        checkSupport()
        updateFullscreenStatus()

        // 添加事件监听
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
        document.addEventListener('mozfullscreenchange', handleFullscreenChange)
        document.addEventListener('MSFullscreenChange', handleFullscreenChange)
        document.addEventListener('keydown', handleKeydown)

        globalFullscreenState.initialized.value = true
    }

    const dispose = () => {
        if (!globalFullscreenState.initialized.value) {
            return
        }

        document.removeEventListener('fullscreenchange', handleFullscreenChange)
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
        document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
        document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
        document.removeEventListener('keydown', handleKeydown)

        globalFullscreenState.initialized.value = false
    }

    return {
        // state
        isSupported,
        isFullscreen,

        init,
        dispose,

        // actions
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen
    }
}
