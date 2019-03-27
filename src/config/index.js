/** 
*   Here some documentation
*   to explain how to use it
*   http://tower01-it-d:3002/
*   http://10.1.250.13:3001/ inside lvr-free
*/

// export const PORT = 3002;
export const PORT = 3001;
export default {
    apiUri: ` http://10.1.250.13:${PORT}/`,
    wsUri: `ws:/10.1.250.13:${PORT}/websocket`
}