
import React from "react"
import { Routes, Route } from 'react-router-dom'
import { LinksPage } from "./pages/LinksPage"
import { CreatePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
import { AuthPage } from "./pages/AuthPage"

export const useRoutes = isAuthenticated => { // флаг для проверки существует ли прользователь и есть ли у него token
    if (isAuthenticated) { // если флаг сработал выводим компонент Switch из reac-dom
        return (
            // <Routes> //! вариант роутинга сторой версии React
            //     <Route path="/links" exact>
            //         <LinksPage />
            //     </Route>
            //     <Route path="/create" exact>
            //         <CreatePage />
            //     </Route>
            //     <Route path="/detail/:id">
            //         <DetailPage />
            //     </Route>
            //     {/*<Redirect to="/create" />*/}
            //     <Route path="/create" ></Route>
            // </Routes>

            <Routes>
                <Route path="/links" element={<LinksPage />} />


                <Route path="/create" element={<CreatePage />} />


                <Route path="/detail/:id" element={<DetailPage />} />

                <Route path="*" element={<CreatePage />} />

            </Routes>

        )
    }

    return (                // если флаг isAuthenticated не сработал и пользователь еще не в системе - выводим следующие роуты....
        // <Routes>         //! вариант роутинга сторой версии React
        //     <Route path="/" exact>
        //         <AuthPage />
        //     </Route>
        //     {/** <Redirect to="/" />*/}
        //     <Route path="/" ></Route>
        // </Routes>

        <Routes>
            <Route path="/" element={<AuthPage />} />


            {/** <Redirect to="/" />*/}
            <Route path="/" /> {/*возможно придется изменить этот редирект */}

        </Routes>
    )
}
