export { Trans } from './Trans.js';
export { Trans as TransWithoutContext } from './TransWithoutContext.js';
export { useTranslation } from './useTranslation.js';
export { withTranslation } from './withTranslation.js';
export { Translation } from './Translation.js';
export { I18nextProvider } from './I18nextProvider.js';
export { withSSR } from './withSSR.js';
export { useSSR } from './useSSR.js';
export { initReactI18next } from './initReactI18next.js';
export { setDefaults, getDefaults } from './defaults.js';
export { setI18n, getI18n } from './i18nInstance.js';

export { I18nContext, composeInitialProps, getInitialProps } from './context.js';

// dummy functions for icu.macro support

export const date = () => '';
export const time = () => '';
export const number = () => '';
export const select = () => '';
export const plural = () => '';
export const selectOrdinal = () => '';
