import { shallowMount } from '@vue/test-utils';
import LoopSlider from '@/components/organisms/loop-slider';

describe('LoopSlider', () => {
  let wrapper;

  jest.useFakeTimers();

  const dragEvent = (x, y) => ({
    e: { preventDefault: () => {} },
    distance: { x, y },
  });

  const factory = () =>
    shallowMount(LoopSlider, {
      slots: {
        default: '<p class="content">Content</p>',
      },
    });

  describe('when scroll window', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.window-scroll').vm.$emit('scroll');
    });

    it('disable slider', () => {
      expect(wrapper.find({ ref: 'drag-drop' }).props().enabled).toBe(false);
    });
  });

  describe('when scroll window', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.window-scroll').vm.$emit('end');
    });

    it('enable slider', () => {
      expect(wrapper.find({ ref: 'drag-drop' }).props().enabled).toBe(true);
    });
  });

  describe('when left-swiped', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find({ ref: 'drag-drop' }).vm.$emit('end', dragEvent(200, 0));
      jest.runOnlyPendingTimers();
    });

    it('emit slide-left', () => {
      expect(wrapper.emitted('slide-left')).toBeTruthy();
    });
  });

  describe('when right-swiped', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find({ ref: 'drag-drop' }).vm.$emit('end', dragEvent(-200, 0));
      jest.runOnlyPendingTimers();
    });

    it('emit slide-right', () => {
      expect(wrapper.emitted('slide-right')).toBeTruthy();
    });
  });
});
