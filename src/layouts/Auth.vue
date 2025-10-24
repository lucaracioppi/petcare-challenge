<template>
  <v-container class="auth-container" fluid>
    <v-row class="fill-height">
      <!-- Columna del formulario -->
      <v-col cols="12" lg="6" class="d-flex align-center justify-center">
        <v-card class="pa-8 auth-card w-75 w-md-50 w-lg-75" elevation="2">
          <img
            src="/logo-petcare.png"
            alt="PetCare Logo"
            class="mb-4 mx-auto d-block"
          />
          <slot />
        </v-card>
      </v-col>

      <!-- Columna de la imagen -->
      <v-col cols="12" lg="6" class="auth-image d-none d-lg-flex pa-0">
        <img src="/auth-img.png" alt="PetCare" class="auth-img" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// Layout simple, todo pasa por slot
</script>

<style scoped>
.auth-container {
  background-color: var(--v-theme-accent);
  height: 100vh;
  padding: 0;
  overflow: hidden;
}

/* Imagen de fondo */
.auth-image {
  background-color: #f5f5f5; /* color de respaldo */
  justify-content: center;
  align-items: center;
  display: flex;
}

.auth-img {
  width: 100%;
  height: 105vh;
  object-fit: cover;
}

/* Card */
.auth-card {
  background-color: var(--v-theme-secondary);
  border-radius: 16px;
}

/* Responsive: la imagen desaparece en pantallas pequeñas */
@media (max-width: 960px) {
  .auth-image {
    display: none !important;
  }
}
</style>
