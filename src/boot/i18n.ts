import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import messages from '../i18n';

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = typeof messages['en'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
    // define the locale messages schema
    export interface DefineLocaleMessage extends MessageSchema { }

    // define the datetime format schema
    export interface DefineDateTimeFormat { }

    // define the number format schema
    export interface DefineNumberFormat { }
}
/* eslint-enable @typescript-eslint/no-empty-interface */

export default boot(({ app }) => {
    console.log('[i18n] init >')

    const i18n = createI18n({
        legacy: false,
        locale: 'es',
        fallbackLocale: 'en',
        messages,
    });

    // Set i18n instance on app
    app.use(i18n);

    console.log('[i18n] init <')
});
