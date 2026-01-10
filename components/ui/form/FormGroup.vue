<template>
  <div class="FormGroup" :class="classes">
    <label v-if="label">
      <span v-html="label"></span>
      <span v-if="required">*</span>
    </label>
    <div>
      <div class="FormGroup-body" ref="body">
        <slot></slot>
      </div>
      <div class="FormGroup-errors" v-if="errors && errors.length > 0">
        <div v-for="(error, index) in errors" :key="index" class="error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAppLocale } from '../../../composables/useAppLocale'

export default {
    props: {
        label: String,
        validations: Object,
        alignRight: Boolean,
        alignEnd: Boolean,
        alignCenter: Boolean,
        bodyInline: Boolean,
        required: Boolean,
        spaced: Boolean
    },

    setup() {
        const { trans } = useAppLocale()
        return { trans }
    },

    computed: {

        classes() {
            return {
                'FormGroup--invalid': this.invalid,
                'FormGroup--alignRight': this.alignRight,
                'FormGroup--alignEnd': this.alignEnd,
                'FormGroup--alignCenter': this.alignCenter,
                'FormGroup--bodyInline': this.bodyInline,
                'FormGroup--spaced': this.spaced
            }
        },

        errors() {

            if (!this.validations) {
                return null
            }

            if (!this.invalid) {
                return []
            }

            return this.validations.$errors.reduce(
                (errors: string[], error: any) => {
                    const validationKey = 'validation.' + error.$validator
                    const validatorKey = error.$validator
                    const validatorData = (this.validations as any)[validatorKey]
                    const params = validatorData?.$params || {}
                    
                    const translatedString = this.trans(validationKey)
                    const errorMessage = this.renderTemplate(translatedString, params)
                    errors.push(errorMessage)
                    return errors
                },
                []
            )
        },

        invalid() {

            if (!this.validations) {
                return false
            }

            return this.validations.$dirty && this.validations.$invalid
        }
    },

    methods: {
        renderTemplate(templateString: string, params: Record<string, any>): string {
            if (!templateString || !params) {
                return templateString || ''
            }

            return templateString.replace(/{{([\s\S]+?)}}/g, (match, key) => {
                const trimmedKey = key.trim()
                return params[trimmedKey] !== undefined ? String(params[trimmedKey]) : match
            })
        }
    },
}
</script>

<style lang="scss">

$label-width-xl: 200px;

.FormGroup {
    width: 100%;
    margin-bottom: 0.8em;
    margin-top: 0.8em;
    display: flex;

    > *:not(label) {
        margin-left: $label-width-xl;
        flex: 1;
    }

    > label {
        color: $color-text-themeDark;
        display: inline-block;
        font-weight: normal;
        padding-right: 1.3em;
        padding-top: 0.7em;
        text-align: right;
        vertical-align: top;
        width: $label-width-xl;

        & + * {
            margin-left: 0;
            align-self: flex-end;
        }

        &.label-multiline {
            line-height: 22px;
            white-space: normal;
        }

        &.label-small {
            width: 10%;
        }

        &.label-top-valign {
            vertical-align: top;
        }
    }

    &-body {

        & > label,
        .input-label {
            font-weight: bold;
            display: inline-block;
            padding: 0.5em 0;
        }
    }

    input[type="text"],
    input[type="search"],
    input[type="number"],
    input[type="email"],
    input[type="url"],
    input[type="password"],
    select,
    .InputAutocomplete,
    .InputUrl,
    .InputTextLink,
    textarea {
        width: 100%;
        max-width: 100%;

        &.input-xl {
            font-size: 2em;
        }

        &.input-lg {
            font-size: 1.5em;
        }

        &.input-width-xxs {
            max-width: 50px;
        }

        &.input-width-xs {
            max-width: 125px;
        }

        &.input-width-sm {
            max-width: 250px;
        }

        &.input-width-md {
            max-width: 500px;
        }

        &.input-width-75 {
            width: 75%;
        }

        &.textarea-height-sm {
            height: 65px;
        }

        &.textarea-height-md {
            height: 130px;
        }

    }

    input[type=checkbox] {
        margin: 0.8em 0.8em 0em 0.4em;
    }

    .inputAndLabel {
        display: flex;
        line-height: 1.5;

        > label {
            margin-top: 0.15em;

            a {
                color: $color-link;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    &--invalid {

        input[type='text'],
        input[type='date'],
        input[type='password'],
        input[type='number'],
        input[type='email'],
        input[type='url'],
        select,
        textarea,
        input[type='checkbox']:before,
        input[type='radio']:before {
            border-color: $color-error;
        }
    }

    &--alignRight {
        text-align: right;
    }

    &--alignEnd {
        align-self: flex-end;
    }

    &--alignCenter {
        align-self: center;

        &.FormGroup--bodyInline .FormGroup-body {
            align-items: center;
        }
    }

    &--bodyInline {

        .FormGroup-body {
            display: flex;
            align-items: flex-start;
            gap: 0.5em;
            flex-wrap: wrap;
        }

        &.FormGroup--spaced {

            .FormGroup-body {
                column-gap: 2em;
                row-gap: 1em;
            }
        }
    }

    &-errors {
        margin-top: 0.5em;
        color: $color-error;
    }
}

.themeLight {

    .FormGroup {

        > label {
            color: $color-text-themeLight;
        }
    }
}

@media (max-width: $sm-max) or ((max-width: $md-max) and (orientation: landscape)) {

    .FormGroup {
        display: block;

        > *:not(label) {
            margin-left: 0;
            flex: initial;
        }

        > label {
            display: block;
            padding: 0;
            line-height: initial;
            text-align: initial;
            white-space: initial;
            margin-bottom: 0.4em;
            font-size: 13px;
        }

        input[type="text"],
        input[type="email"],
        input[type="url"],
        input[type="number"],
        input[type="password"],
        select,
        .InputAutocomplete,
        .InputUrl,
        .InputTextLink,
        textarea {

            &.input-xl {
                font-size: 1.5em;
            }
        }
    }
}
</style>
