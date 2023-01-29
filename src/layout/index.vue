<template>
  <div v-if="$route.query.isFrame == 'true'" class="iframe-app-wrap">
    <app-main />
  </div>
  <div v-else :class="classObj" class="app-wrapper">
    <div :class="{ 'fixed-header': true }">
      <navbar />
    </div>
    <div v-if="$route.meta.isCreatePage">
      <div style="height: 50px"></div>
      <router-view :key="key" />
    </div>
    <div class="app-wrapper-ctn" v-else>
      <sidebar class="sidebar-container" />
      <div class="main-container" :class="{ hasTagsView: needTagsView }">
        <div class="">
          <tags-view v-if="needTagsView" />
        </div>
        <app-main />
      </div>
    </div>
  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    showSettings() {
      return this.$store.state.settings.showSettings
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    needTagsView() {
      return this.$store.state.settings.tagsView
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-container ::v-deep {
  background-color: rgba(255, 255, 255, 1);

  // 2021-07-22 start
  .el-submenu.is-active .el-submenu__title {
    border-bottom-color: $nav-main-color;
    background: $nav-main-color !important;
  }
  .el-submenu.is-active.is-opened .el-submenu__title {
    border-bottom: none !important;
    background: $nav-main-color !important;
  }
  ul.el-menu.el-menu--inline {
    background: $nav-main-color !important;
  }
  // end
  .el-submenu__title,
  .el-menu-item {
    color: $nav-font-color;
    i {
      color: $nav-font-color;
    }
  }
  // .scrollbar-wrapper .el-menu:first-child > .menu-wrapper {
  //   // border-bottom: 1px solid $nav-secondary-color;//导航栏底部白线
  // }
  .el-submenu__title {
    &:hover {
      // 2021-07-22 start
      // background-color: rgba(255, 255, 255, 1) !important;
      background: $nav-main-color !important;
      // background: $primaryColor-ie !important;
      // background: $primaryColor !important;
      // border-bottom-color: $nav-main-color;
      // end
      color: #fff !important;

      i {
        color: #fff !important;
      }
    }
  }
  .el-menu-item {
    &:hover {
      // 2021-07-22 start
      // background-color: rgba(255, 255, 255, 1) !important;
      background: $primaryColor-ie !important;
      background: $primaryColor !important;
      // border-bottom-color: $nav-main-color;
      // end
      color: #fff !important;

      i {
        color: #fff !important;
      }
    }
  }
  .el-submenu__title,
  .el-menu-item {
    // 2021-07-22 start
    height: 42px;
    line-height: 42px;
    // border-bottom: solid 1px $nav-secondary-color;
    background: $nav-secondary-color;
    // end
    // &:hover {
    //   // 2021-07-22 start
    //   // background-color: rgba(255, 255, 255, 1) !important;
    //   background: $nav-main-color !important;
    //   // background: $primaryColor-ie !important;
    //   // background: $primaryColor !important;
    //   // border-bottom-color: $nav-main-color;
    //   // end
    //   color: #fff !important;

    //   i {
    //     color: #fff !important;
    //   }
    // }

    &.is-active {
      i {
        color: #fff !important;
      }
      // 2021-07-22 start
      // background-color:   rgba(255, 255, 255, 1) !important;;
      background: $primaryColor-ie !important;
      background: $primaryColor !important;
      // end
      color: #fff !important;
    }
  }
}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }

  .app-wrapper-ctn {
    position: relative;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width 0.28s;
}

.iframe-app-wrap {
  background: #fff;
  height: 100%;

  ::v-deep {
    .app-main {
      min-height: 100vh;

      .app-main-wrap {
        padding: 0 0 0 10px;
      }
    }

    .el-breadcrumb {
      display: none;
    }

    .design-form-wrap__btnwrap {
      display: none;
    }
  }
}
</style>
