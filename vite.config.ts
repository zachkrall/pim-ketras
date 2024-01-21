import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: './src/ml/myModel/model.json',
          dest: '',
        },
        {
          src: './src/ml/myModel/weights.bin',
          dest: '',
        },
        {
          src: './src/ml/trainingData/corpus.txt',
          dest: '',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
