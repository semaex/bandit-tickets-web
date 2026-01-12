<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
  name: 'TextContent',

  props: {
    h1Medium: {
      type: Boolean,
      default: false
    },
    h3Blocks: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes(): Record<string, boolean> {
      return {
        'TextContent': true,
        'TextContent--h1Medium': this.h1Medium,
        'TextContent--h3Blocks': this.h3Blocks
      }
    }
  }
}
</script>

<style lang="scss">

@use '../../../assets/scss/mixins' as *;

.TextContent {
    line-height: 1.5;

    & > *:first-child {
        margin-top: 0;

        & > *:first-child {
            margin-top: 0;
        }
    }

    a {
        &:hover, &:active, &:focus {
            text-decoration: underline;
        }
    }

    p {
        margin: 1em 0;
    }

    h1, h2, h3, h4, h5, h6 {
        line-height: 1.2;
        margin: 1em 0 0.5em 0;
    }

    h1 {
        font-size: 2.5em;
        background: linear-gradient(135deg, var(--color-text-content-gradient-start), var(--color-text-content-gradient-end));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    h2 {
        font-size: 1.75em;
    }

    h3 {
        font-size: 1.50em;
    }

    h4 {
        font-size: 1.40em;
    }

    h5 {
        font-size: 1.25em;
    }

    h6 {
        font-size: 1em;
    }

    ul, ol {
        list-style: disc outside none;
        padding-left: 2em;
    }

    li + li {
        padding-top: 0.278em;
    }

    embed {
        max-width: 100%;
    }

    table {
        width: 100%;
        border-top: 2px solid var(--color-N40);
        border-bottom: 2px solid var(--color-N40);
        margin-bottom: 21px;
    }

    table th {
        border-bottom: 2px solid var(--color-N40);
        text-align: center;
    }

    table td {
        padding: 5px 0;
    }

    hr {
        border-top: 1px solid var(--color-N90);
        border-bottom: none;
        margin: 2em 0;
    }

    & > *:last-child {
        margin-bottom: 0;
    }

    &--h1Medium {

        h1 {
            font-size: 2.5em;
        }
    }

    &--h3Blocks {

        h3 {
            &:not(:first-child) {
                margin-top: 1em;
                padding-top: 1em;
                border-top: 1px solid var(--color-N90);
            }
        }
    }

    blockquote {
        margin: 1em 0 1em 1em;
        padding-left: 1em;
        border-left: 2px solid var(--color-N75);
    }
}


@include mobile {

    .TextContent {

        h1 {
            font-size: 2.5em;
        }

        h2 {
            font-size: 1.8em;
        }

        h3 {
            font-size: 1.6em;
        }

        h4 {
            font-size: 1.4em;
        }

        h5 {
            font-size: 1.1em;
        }

        h6 {
            font-size: 1em;
        }

        &--h1Medium {

            h1 {
                font-size: 2em;
            }
        }
    }
}

</style>
