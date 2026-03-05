import { defineConfig } from "orval";

export default defineConfig({
  API: {
    input: {
      target: "http://localhost:4000/openapi/json",
    },
    output: {
      mode: 'tags-split',
      target: 'src/lib/api/index.ts',
      client: 'svelte-query',
      baseUrl: "http://localhost:4000/",
      schemas: "src/lib/api/schemas"
    },
  },
  APIZod: {
    input: {
      target: "http://localhost:4000/openapi/json",
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: 'src/lib/api/index.ts',
      fileExtension: '.zod.ts',
      override: {
        zod: {
          generate: {
            response: false
          }
        }
      }
    },
  },
});
