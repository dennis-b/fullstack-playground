import { QueryClient, QueryClientProvider } from "react-query";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { StyledAppRoot } from './App.styled';
import { HomePage } from "./Pages/Home/HomePage";
import { UserPage } from "./Pages/User/UserPage";

const queryClient = new QueryClient()

function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    <StyledAppRoot>
                        <Routes>
                            <Route
                                path={'/home'}
                                element={<HomePage/>}
                            />
                            <Route
                                path={'/user'}
                                element={<UserPage/>}
                            />
                            <Route path="/" element={<Navigate to="/home"/>}/>
                        </Routes>
                    </StyledAppRoot>
                    {/*<AppNotify ref={setNotify}/>*/}
                </RecoilRoot>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default App
