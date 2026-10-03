export async function searchMedications(query: string) {
  // TODO: replace with real API call
  await new Promise((r) => setTimeout(r, 600))
  return { medications: [], total: 0 }
}

export async function searchByImage(file: File) {
  // TODO: integrate computer vision API
  const formData = new FormData()
  formData.append('image', file)
  return { medications: [], total: 0 }
}

export async function searchByAudio(audioBlob: Blob) {
  // TODO: integrate speech-to-text API
  return { query: '', medications: [], total: 0 }
}
