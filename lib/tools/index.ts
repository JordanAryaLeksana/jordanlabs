import "server-only"

import { createNavigationTools } from "./navigation"
export function createPortofolioTools() {
    return{
        ...createNavigationTools(),
    }
}