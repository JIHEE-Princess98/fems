import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './style/index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ConfigProvider} from "antd";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider
                    theme={{
                        token: {
                            fontFamily: 'NotoSansKR, Montserrat, sans-serif',
                        },
                    }}
                >
                <App/>
                </ConfigProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
)
