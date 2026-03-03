import { defineConfig } from "orval";

export default defineConfig({
  API: {
    input: {
      target: "http://localhost:4000/openapi/json",
    },
    output: {
      mode: 'tags-split',
      target: 'src/api/index.ts',
      schemas: 'src/api/model',
      client: 'svelte-query',
      baseUrl: "http://localhost:4000/"
    },
  },
});
