<template>
  <div
    ref="pupilRef"
    class="rounded-full"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: pupilColor,
      transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
      transition: 'transform 0.1s ease-out'
    }"
  />
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 12
  },
  maxDistance: {
    type: Number,
    default: 5
  },
  pupilColor: {
    type: String,
    default: 'black'
  },
  forceLookX: {
    type: Number,
    default: undefined
  },
  forceLookY: {
    type: Number,
    default: undefined
  },
  mouseX: {
    type: Number,
    default: 0
  },
  mouseY: {
    type: Number,
    default: 0
  }
})

const pupilRef = ref(null)

const pupilPosition = computed(() => {
  if (!pupilRef.value) return { x: 0, y: 0 }

  if (props.forceLookX !== undefined && props.forceLookY !== undefined) {
    return { x: props.forceLookX, y: props.forceLookY }
  }

  const pupil = pupilRef.value.getBoundingClientRect()
  const pupilCenterX = pupil.left + pupil.width / 2
  const pupilCenterY = pupil.top + pupil.height / 2

  const deltaX = props.mouseX - pupilCenterX
  const deltaY = props.mouseY - pupilCenterY
  const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), props.maxDistance)

  const angle = Math.atan2(deltaY, deltaX)
  const x = Math.cos(angle) * distance
  const y = Math.sin(angle) * distance

  return { x, y }
})
</script>
