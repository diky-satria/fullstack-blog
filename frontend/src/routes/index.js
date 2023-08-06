import React from "react";
import { Routes, Route } from "react-router-dom";

import AuthRoute from "./routeMiddleware/AuthRoute";
import OnlyAdminRoute from "./routeMiddleware/OnlyAdminRoute";
import AuthRoutePostAddEdit from "./routeMiddleware/AuthRoutePostAddEdit";
import Layout from "../views/layout/Layout";
import Dashboard from "../views/dashboard/Dashboard";
import Login from "../views//Login";
import Component1 from "../views/component/Component1";
import Component2 from "../views/component/Component2";
import Contact from "../views/contact/Contact";
import Chart from "../views/chart/Chart";
import Wallet from "../views/wallet/Wallet";
import Setting1 from "../views/setting/Setting1";
import Setting2 from "../views/setting/Setting2";
import Register from "../views/Register";
import ForgotPassword from "../views/ForgotPassword";
import LayoutClient from "../views/layout/LayoutClient";
import Home from "../views/home/Home";
import Topic from "../views/topic/Topic";
import TopicDetail from "../views/topic/TopicDetail";
import ResetPassword from "../views/ResetPassword";
import User from "../views/user/User";
import Postingan from "../views/postingan/Postingan";
import PostinganAdd from "../views/postingan/PostinganAdd";
import PostinganEdit from "../views/postingan/PostinganEdit";
import PostinganDetail from "../views/postingan/PostinganDetail";
import UbahPassword from "../views/ubahpassword/UbahPassword";

export default function Router() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutClient>
              <Home />
            </LayoutClient>
          }
        />
        <Route path="/auth" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route
          path="/reset_password/:email/:token"
          element={<ResetPassword />}
        />
        <Route
          path="/topic"
          element={
            <LayoutClient>
              <Topic />
            </LayoutClient>
          }
        />
        <Route
          path="/topic/:id"
          element={
            <LayoutClient>
              <TopicDetail />
            </LayoutClient>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <OnlyAdminRoute>
                <Dashboard />
              </OnlyAdminRoute>
            </AuthRoute>
          }
        />
        <Route
          path="/user"
          element={
            <AuthRoute>
              <OnlyAdminRoute>
                <User />
              </OnlyAdminRoute>
            </AuthRoute>
          }
        />
        <Route
          path="/postingan"
          element={
            <AuthRoute>
              <Postingan />
            </AuthRoute>
          }
        />
        <Route
          path="/postingan/add"
          element={
            <AuthRoutePostAddEdit>
              <PostinganAdd />
            </AuthRoutePostAddEdit>
          }
        />
        <Route
          path="/postingan/:id/edit"
          element={
            <AuthRoutePostAddEdit>
              <PostinganEdit />
            </AuthRoutePostAddEdit>
          }
        />
        <Route
          path="/postingan/:id/detail"
          element={
            <AuthRoutePostAddEdit>
              <PostinganDetail />
            </AuthRoutePostAddEdit>
          }
        />
        <Route
          path="/ubah_password"
          element={
            <AuthRoute>
              <UbahPassword />
            </AuthRoute>
          }
        />
        <Route
          path="/component1"
          element={
            <Layout>
              <Component1 />
            </Layout>
          }
        />
        <Route
          path="/component2"
          element={
            <Layout>
              <Component2 />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <AuthRoute>
              <Contact />
            </AuthRoute>
          }
        />
        <Route
          path="/chart"
          element={
            <Layout>
              <Chart />
            </Layout>
          }
        />
        <Route
          path="/wallet"
          element={
            <Layout>
              <Wallet />
            </Layout>
          }
        />
        <Route
          path="/setting1"
          element={
            <Layout>
              <Setting1 />
            </Layout>
          }
        />
        <Route
          path="/setting2"
          element={
            <Layout>
              <Setting2 />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}
