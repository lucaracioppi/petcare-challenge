<template>
  <v-container class="auth-container" fluid>
    <v-row class="fill-height">
      <!-- Form -->
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

      <!-- Image -->
      <v-col
        cols="12"
        lg="6"
        class="auth-image d-none d-lg-flex align-center pa-0"
      >
        <img src="/auth-img.png" alt="PetCare" class="auth-img" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.auth-container {
  height: 100vh;
  padding: 0;
  overflow: hidden;
}

.auth-img {
  width: 100%;
  height: 105vh;
  object-fit: cover;
}
</style>
