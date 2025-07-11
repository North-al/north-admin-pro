// 类型定义
type MaybeRefOrGetter<T> = T | Ref<T> | ComputedRef<T> | (() => T)
type MaybeElementRef =
    | string
    | HTMLElement
    | SVGElement
    | ComponentPublicInstance
    | Ref<HTMLElement | undefined>
    | null
    | undefined

export interface UseCssVarOptions {
    /**
     * 初始值
     */
    initialValue?: string
    /**
     * 是否观察变化
     */
    observe?: boolean
    /**
     * 是否使用主题感知模式
     * 当为 true 时，会根据当前主题 [data-theme] 来设置 CSS 变量
     */
    themeAware?: boolean
}

/**
 * 响应式 CSS 变量
 * 类似 @vueuse/core 的 useCssVar
 *
 * @param prop CSS 变量名或响应式变量名
 * @param target 目标元素
 * @param options 选项
 */
export function useCssVar(prop: MaybeRefOrGetter<string>, target?: MaybeElementRef, options: UseCssVarOptions = {}) {
    const { initialValue = '', observe = true, themeAware = false } = options

    const variable = toRef(prop)

    // 获取当前主题
    const getCurrentTheme = (): string => {
        const htmlElement = document.documentElement
        return htmlElement.getAttribute('data-theme') || 'light'
    }

    const targetElement = computed(() => {
        if (typeof target === 'string') {
            // 如果是字符串，作为 CSS 选择器使用
            return (document.querySelector(target) as HTMLElement) || document.documentElement
        } else if (themeAware) {
            // 主题感知模式：根据当前主题设置到对应的主题选择器
            const theme = getCurrentTheme()
            const themeSelector = `[data-theme="${theme}"]`
            const themeElement = document.querySelector(themeSelector) as HTMLElement
            return themeElement || document.documentElement
        } else {
            // 普通模式：使用指定元素或 document.documentElement
            const el = unrefElement(target)
            return el || document?.documentElement
        }
    })

    // 获取当前 CSS 变量值
    const getValue = (): string => {
        const el = targetElement.value
        if (!el) return initialValue

        const varName = variable.value.startsWith('--') ? variable.value : `--${variable.value}`
        return getComputedStyle(el).getPropertyValue(varName).trim() || initialValue
    }

    // 设置 CSS 变量值
    const setValue = (value: string) => {
        const el = targetElement.value
        if (!el) return

        const varName = variable.value.startsWith('--') ? variable.value : `--${variable.value}`
        el.style.setProperty(varName, value)
    }

    // 响应式的 CSS 变量值
    const cssVar = ref(initialValue)

    // 初始化值
    onMounted(() => {
        const currentValue = getValue()
        if (currentValue) {
            cssVar.value = currentValue
        } else if (initialValue) {
            setValue(initialValue)
            cssVar.value = initialValue
        }
    })

    // 监听变量名变化
    watch(
        variable,
        () => {
            const currentValue = getValue()
            cssVar.value = currentValue || initialValue
        },
        { immediate: true }
    )

    // 监听值变化并设置到 CSS
    watch(cssVar, newValue => {
        setValue(newValue)
    })

    // 观察 CSS 变量变化（可选）
    if (observe && typeof MutationObserver !== 'undefined') {
        let observer: MutationObserver | null = null

        watchEffect(onInvalidate => {
            const el = targetElement.value
            if (!el) return

            observer = new MutationObserver(() => {
                const currentValue = getValue()
                if (currentValue !== cssVar.value) {
                    cssVar.value = currentValue
                }
            })

            observer.observe(el, {
                attributes: true,
                attributeFilter: ['style']
            })

            onInvalidate(() => {
                observer?.disconnect()
            })
        })
    }

    return cssVar
}

/**
 * 辅助函数：获取元素引用的实际元素
 */
function unrefElement(elRef: MaybeElementRef): HTMLElement | null {
    if (!elRef) return null

    if (typeof elRef === 'string') {
        return document?.querySelector(elRef) as HTMLElement | null
    }

    const el = unref(elRef)
    // 处理 Vue 组件实例
    if (el && typeof el === 'object' && '$el' in el) {
        return (el as any).$el || null
    }
    return (el as HTMLElement) || null
}

/**
 * 主题感知的 CSS 变量 Hook
 * 根据当前主题自动设置到对应的主题选择器
 */
export function useThemeCssVar(prop: MaybeRefOrGetter<string>, initialValue = '') {
    return useCssVar(prop, undefined, { themeAware: true, initialValue })
}

/**
 * 获取当前主题
 */
export function useCurrentTheme() {
    const theme = ref('light')

    const updateTheme = () => {
        const htmlElement = document.documentElement
        theme.value = htmlElement.getAttribute('data-theme') || 'light'
    }

    // 初始化
    onMounted(() => {
        updateTheme()

        // 监听主题变化
        const observer = new MutationObserver(() => {
            updateTheme()
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        })

        onUnmounted(() => {
            observer.disconnect()
        })
    })

    return theme
}
