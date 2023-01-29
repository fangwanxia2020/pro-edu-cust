<template>
  <div>
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <el-scrollbar style="height: 100%" wrap-class="scrollbar-wrapper">
      <!-- 2021-07-22 删除background-color="rgba(255,255,255,1)" -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        text-color="#BFC3C5"
        :unique-opened="false"
        active-text-color="#fff"
        :collapse-transition="false"
        mode="vertical"
      >
        <template v-for="route in menus">
          <sidebar-item
            v-if="!route.hidden"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { routes } from '@/router'
import { getVisibleNodes } from '@/utils/tool'
import Logo from '../Logo'
import SidebarItem from './SidebarItem'
import Hamburger from '@/layout/components/Hamburger'

export default {
  components: {
    SidebarItem,
    // Logo,
    Hamburger
  },
  computed: {
    ...mapState({
      visibleConfiguredMenus: (state) => state.user.visibleConfiguredMenus,
      sidebar: (state) => state.app.sidebar
    }),
    menus() {
      const visibleConfiguredMenus = this.visibleConfiguredMenus || []
      console.log(visibleConfiguredMenus, 'visibleConfiguredMenus')
      return getVisibleNodes(routes.concat(visibleConfiguredMenus))
    },
    activeMenu() {
      const route = this.$route
      const { meta, path, name } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      if (meta.isMicrApp && !(name || '').endsWith('_all')) {
        localStorage.setItem('MicrAppGrade', path.split('/').length)
      }
      if (meta.isMicrApp && (name || '').endsWith('_all')) {
        // 微应用的子页面不匹配菜单的页面
        var arr = path.split('/')
        var num = Number(localStorage.getItem('MicrAppGrade')) || 3
        arr = arr.slice(0, num)
        return arr.join('/')
      }
      return path
    },
    primaryColor() {
      return this.$store.state.theme.primaryColor
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    permission_routes1() {
      return this.permission_routes
    }
  },
  mounted() {},
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>
<style scoped lang="scss">
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
