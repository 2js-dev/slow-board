<template>
  <main>
    <h1>서버 연결 확인</h1>

    <p v-if="loading">확인 중...</p>
    <p v-else-if="errorMessage" class="error">실패: {{ errorMessage }}</p>
    <dl v-else-if="health">
      <dt>서버</dt>
      <dd>{{ health.status }}</dd>
      <dt>DB</dt>
      <dd>{{ health.database }}</dd>
      <dt>서버 시각</dt>
      <dd>{{ health.serverTime }}</dd>
    </dl>

    <button type="button" :disabled="loading" @click="checkHealth">다시 확인</button>
  </main>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchHealth } from '@/api/health'
import type { HealthResponse } from '@/types/health'

const health = ref<HealthResponse | null>(null)
const errorMessage = ref<string | null>(null)
const loading = ref(false)

async function checkHealth() {
  loading.value = true
  errorMessage.value = null

  try {
    health.value = await fetchHealth()
  } catch (error) {
    health.value = null
    errorMessage.value = error instanceof Error ? error.message : String(error)
  } finally {
    loading.value = false
  }
}

onMounted(checkHealth)
</script>
<style scoped>
main {
  max-width: 480px;
  margin: 40px auto;
  font-family: sans-serif;
}

.error {
  color: #c62828;
}

dt {
  font-weight: bold;
}

dd {
  margin: 0 0 12px;
}
</style>
