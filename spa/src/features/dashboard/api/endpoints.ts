export const endpoints = {
    FETCH_ALL_CLAIMS: '/claims',
    FETCH_NEW_CLAIMS_COUNT: '/new-claims/count',
    FETCH_USER: (id: number) => `/users/${id}`,
}