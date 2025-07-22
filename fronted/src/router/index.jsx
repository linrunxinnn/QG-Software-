import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/home.jsx";
import Personal from "../pages/personal/personal.jsx";
import Fans from "../pages/personal/fans.jsx";
import MomentsLayout from "../pages/personal/momentsLayout.jsx";
import Appointment from "../pages/personal/appointment.jsx";
import Settings from "../pages/personal/settings.jsx";
import Detail from "../pages/detail/detail.jsx";
import Moments from "../pages/moments/moments.jsx";
import Publish from "../pages/publish/publish.jsx";
import ShowList from "../pages/publish/showList.jsx";
import EditPost from "../pages/publish/editPost.jsx";
import CreatePost from "../pages/publish/createPost.jsx";
import ControlPage from "../pages/contorlPage/controlPage.jsx";
import CheckDetail from "../pages/contorlPage/component/softdetail.jsx";
import ShowSoft from "../pages/contorlPage/component/showSoft.jsx"
import UserList from "../pages/contorlPage/component/userList.jsx"
import CheckList from "../pages/contorlPage/component/CheckList.jsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        //个人页面
        path: "personal",
        element: <Personal />,
        children: [
          {
            //粉丝数（软件提供商）/关注数（普通用户）
            index: true,
            element: <Fans />,
          },
          {
            //动态（软件提供商特有）
            path: "momentsLayout",
            element: <MomentsLayout />,
          },
          {
            //已预约的软件
            path: "appointment",
            element: <Appointment />,
          },
          {
            //设置
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        //软件详情页面（一个开发商版，一个用户版，用户版再分为已购未购）
        path: "detail/:id",
        element: <Detail />,
      },
      {
        //动态页面（消息）
        path: "moments",
        element: <Moments />,
      },
      {
        //发布页面
        path: "publish",
        element: <Publish />,
        children: [
          {
            //列表展示&下拉栏搜索栏
            index: true,
            element: <ShowList />,
          },
          {
            //点击已发布进行修改
            path: "edit/:id",
            element: <EditPost />,
          },
          {
            //创建新发布
            path: "create",
            element: <CreatePost />,
          },
        ],
      },
    ],

  },
  {
    //管理端路径
    path: "/manager",
    element: <ControlPage />,
    children: [
      {
        index: true,
        element: <CheckList />,
      },
      {
        path: "user",
        element: <UserList />,
      },
      {
        path: "comment",
        element: <ShowSoft />,
      },
      {
        path: "detail/:name",
        element: <CheckDetail />
      }
    ]
  },

]);
