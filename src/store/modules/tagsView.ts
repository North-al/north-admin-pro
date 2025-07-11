export interface TagItem {
    name: string
    path: string
    title: string
    closable: boolean
    fixed: boolean
    icon?: string
}

export const useTagsViewStore = defineStore(
    'tagsView',
    () => {
        // 状态
        const tags = ref<TagItem[]>([])

        // 计算属性
        const closableTags = computed(() => tags.value.filter(tag => tag.closable))
        const fixedTags = computed(() => tags.value.filter(tag => tag.fixed))
        const hasTag = (path: string) => tags.value.some(tag => tag.path === path)

        // 方法
        const addTag = (tag: TagItem) => {
            const existingTag = tags.value.find(t => t.path === tag.path)
            if (!existingTag) {
                tags.value.push(tag)
            }
        }

        const removeTag = (path: string) => {
            const index = tags.value.findIndex(tag => tag.path === path)
            if (index > -1) {
                const tag = tags.value[index]
                if (tag.closable) {
                    tags.value.splice(index, 1)
                }
            }
        }

        const toggleFixed = (path: string) => {
            const tag = tags.value.find(t => t.path === path)
            if (tag && tag.closable) {
                tag.fixed = !tag.fixed
            }
        }

        const closeOthers = (targetPath: string) => {
            tags.value = tags.value.filter(tag => tag.path === targetPath || !tag.closable || tag.fixed)
        }

        const closeAll = () => {
            tags.value = tags.value.filter(tag => !tag.closable || tag.fixed)
        }

        const closeLeft = (targetPath: string) => {
            const targetIndex = tags.value.findIndex(tag => tag.path === targetPath)
            if (targetIndex === -1) return

            const leftTags = tags.value.slice(0, targetIndex)
            const pathsToRemove = leftTags.filter(tag => tag.closable && !tag.fixed).map(tag => tag.path)

            tags.value = tags.value.filter(tag => !pathsToRemove.includes(tag.path))
        }

        const closeRight = (targetPath: string) => {
            const targetIndex = tags.value.findIndex(tag => tag.path === targetPath)
            if (targetIndex === -1) return

            const rightTags = tags.value.slice(targetIndex + 1)
            const pathsToRemove = rightTags.filter(tag => tag.closable && !tag.fixed).map(tag => tag.path)

            tags.value = tags.value.filter(tag => !pathsToRemove.includes(tag.path))
        }

        return {
            // 状态
            tags,
            // 计算属性
            closableTags,
            fixedTags,
            hasTag,
            // 方法
            addTag,
            removeTag,
            toggleFixed,
            closeOthers,
            closeAll,
            closeLeft,
            closeRight
        }
    },
    {
        persist: {
            key: 'north-admin-tags',
            storage: sessionStorage
        }
    }
)
