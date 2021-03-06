<template>
  <div class="default" ontouchstart="">
    <nav-modal
      :initial-component="ActivityEditor"
      :keep-alives="['ActivityEditor']"
      height="450"
      name="activity"
    />
    <side-bar />
    <login-guard class="content">
      <nuxt keep-alive />
      <toast />
      <client-only>
        <pwa-popover />
      </client-only>
    </login-guard>
  </div>
</template>

<script>
import LoginGuard from '@/components/atoms/login-guard';
import Toast from '@/components/molecules/toast';
import PwaPopover from '@/components/organisms/pwa-popover';
import SideBar from '@/components/organisms/side-bar';
import NavModal from '@/components/organisms/nav-modal';
import ActivityEditor from '@/components/organisms/activity-editor';
import { mapGetters } from 'vuex';
import { fromS } from 'hh-mm-ss';
import { differenceInSeconds, parseISO } from 'date-fns';

export default {
  timers: {
    updateDuration: {
      time: 500,
      autostart: true,
      repeat: true,
    },
  },
  components: {
    Toast,
    LoginGuard,
    NavModal,
    SideBar,
    PwaPopover,
  },
  head() {
    return {
      titleTemplate: this.titleTemplate,
    };
  },
  props: {
    showSideMenu: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      ActivityEditor,
      duration: undefined,
    };
  },
  computed: {
    ...mapGetters({
      working: 'activities/working',
    }),
    titleTemplate() {
      return this.duration && `${this.duration}・%s`;
    },
  },
  mounted() {
    this.$store.dispatch('projects/fetch');
    this.$store.dispatch('user/fetch');
  },
  methods: {
    updateDuration() {
      this.duration = this.working
        ? fromS(
            differenceInSeconds(new Date(), parseISO(this.working.startedAt))
          )
        : undefined;
    },
  },
};
</script>

<style scoped lang="scss">
.default {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: $side-bar-min-width;
}
@include mq(small) {
  .content {
    margin-left: 0;
    margin-top: $side-bar-min-height;
  }
}
</style>
