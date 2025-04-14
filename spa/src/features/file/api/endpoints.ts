export const endpoints = {
    FETCH_ALL_FILES: '/files',  // GET
    CREATE_FILE: '/files',  // POST
    FETCH_FILE: (id: number) => `/files/${id}`,  // GET
    FETCH_RELATED_FILES: (id: number) => `/files/${id}/related`,  // GET
    UPDATE_FILE: (id: number) => `/files/${id}`,  // PUT, PATCH
    DELETE_FILE: (id: number) => `/files${id}`,  // DELETE
    FETCH_DOWNLOAD_URL: (id: number) => `/files/${id}/download`,  // GET 

    FETCH_ALL_TAGS: '/tags',  // GET

    FETCH_SETTINGS: '/settings',  // GET
    FETCH_EXTENSIONS: '/extensions/enabled',  // GET
}