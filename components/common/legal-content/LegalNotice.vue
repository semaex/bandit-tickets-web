<template>
 <TextContent>
            <h1>Aviso Legal</h1>

     <p>
         En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSICE),
         a continuación se detallan los datos identificativos de la empresa:
     </p>

     <p>
         <strong>Nombre empresa:</strong> BANDIT BITS S.L.<br>
         <strong>Razón social:</strong> BANDIT BITS S.L.<br>
         <strong>NIF:</strong> B43739912<br>
         <strong>Dirección:</strong> Carrer Moranta, 2 – 08530 – La Garriga – BARCELONA<br>
         <strong>Teléfono:</strong> 695961673<br>
         <strong>Email:</strong> contact@bandit.tickets
     </p>

     <p>&nbsp;</p>

     <h2><strong>FINALIDAD DEL SITIO WEB</strong></h2>

     <p>
         Este sitio web tiene como finalidad facilitar la compra online de entradas para eventos (en adelante, las “Entradas”),
         así como proporcionar información relacionada con los eventos, el proceso de compra, la entrega electrónica de las Entradas
         y la atención al cliente.
     </p>

     <p>
         Salvo que se indique lo contrario durante el proceso de compra, los precios mostrados incluyen los impuestos aplicables (IVA incluido).
     </p>

     <p>
         El presente aviso legal (en adelante, el «Aviso Legal») regula el uso del sitio web: <strong>bandit.tickets</strong>
     </p>

     <p>&nbsp;</p>

     <h2><strong>LEGISLACIÓN</strong></h2>

     <p>
         Con carácter general, las relaciones entre BANDIT BITS S.L. y los Usuarios de sus servicios telemáticos,
         presentes en este sitio web, se encuentran sometidas a la legislación y jurisdicción españolas.
     </p>

     <p>&nbsp;</p>

     <h2><strong>USO Y ACCESO DE USUARIOS</strong></h2>

     <p>
         El Usuario queda informado, y acepta, que el acceso a la presente web no supone, en modo alguno,
         el inicio de una relación comercial con BANDIT BITS S.L., más allá de lo derivado del uso del sitio web y,
         en su caso, de la compra de Entradas bajo las condiciones aplicables.
     </p>

     <p>&nbsp;</p>

     <h2><strong>PROPIEDAD INTELECTUAL E INDUSTRIAL</strong></h2>

     <p>
         Los derechos de propiedad intelectual del contenido de las páginas web, su diseño gráfico y códigos son titularidad de BANDIT BITS S.L.
         y, por tanto, queda prohibida su reproducción, distribución, comunicación pública, transformación o cualquier otra actividad
         que se pueda realizar con los contenidos de sus páginas web ni aun citando las fuentes, salvo consentimiento por escrito de BANDIT BITS S.L.
     </p>

     <p>&nbsp;</p>

     <h2><strong>CONTENIDO DE LA WEB Y ENLACES (LINKS)</strong></h2>

     <p>
         BANDIT BITS S.L. se reserva el derecho a actualizar, modificar o eliminar la información contenida en sus páginas web
         pudiendo incluso limitar o no permitir el acceso a dicha información a ciertos usuarios.
     </p>

     <p>
         BANDIT BITS S.L. no asume responsabilidad alguna por la información contenida en páginas web de terceros a las que se pueda acceder
         por «links» o enlaces desde cualquier página web propiedad de BANDIT BITS S.L..
         La presencia de «links» o enlaces en las páginas web de BANDIT BITS S.L. tiene finalidad meramente informativa y en ningún caso
         supone sugerencia, invitación o recomendación sobre los mismos.
     </p>

 </TextContent>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { useAppLocale } from '../../../composables/useAppLocale'
import TextContent from '../../ui/text-content/TextContent.vue'

export default defineComponent({
    name: 'PrivacyPolicy',

    components: {
        TextContent
    },

    data() {
        const {appLocale} = useAppLocale()

        return {
            appLocale
        }
    }
})

</script>
