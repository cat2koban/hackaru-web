import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Integrations from '@/pages/settings/integrations';

describe('Integrations', () => {
  let wrapper;

  delete window.location;
  window.location = { assign: jest.fn() };

  const $store = new Store({
    getters: {
      'activity-calendar/googleCalendarUrl': 'https://example.com',
      'activity-calendar/webcalUrl': 'webcal://example.com',
    },
  });

  const factory = () =>
    shallowMount(Integrations, {
      mocks: { $store },
    });

  beforeEach(() => {
    $store.reset();
  });

  describe('when click google calendar button', () => {
    const assign = jest.fn();

    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      window.open = () => ({ location: { assign }, closed: false });
      wrapper = factory();
      wrapper.find('.google-calendar-button').vm.$emit('click');
    });

    it('dispatch activity-calendar/createUrl', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activity-calendar/createUrl'
      );
    });

    it('navigate to google calendar url', () => {
      expect(assign).toHaveBeenCalledWith('https://example.com');
    });
  });

  describe('when click google calendar button but child window closed', () => {
    const assign = jest.fn();

    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      window.open = () => ({ location: { assign }, closed: true });
      wrapper = factory();
      wrapper.find('.google-calendar-button').vm.$emit('click');
    });

    it('does not navigate', () => {
      expect(window.location.assign).not.toHaveBeenCalled();
    });
  });

  describe('when click apple calendar button', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory();
      wrapper.find('.apple-calendar-button').vm.$emit('click');
    });

    it('dispatch activity-calendar/createUrl', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activity-calendar/createUrl'
      );
    });

    it('navigate to webcal url', () => {
      expect(window.location.assign).toHaveBeenCalledWith(
        'webcal://example.com'
      );
    });
  });

  describe('when click outlook button', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory();
      wrapper.find('.outlook-button').vm.$emit('click');
    });

    it('dispatch activity-calendar/createUrl', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activity-calendar/createUrl'
      );
    });

    it('navigate to webcal url', () => {
      expect(window.location.assign).toHaveBeenCalledWith(
        'webcal://example.com'
      );
    });
  });
});
