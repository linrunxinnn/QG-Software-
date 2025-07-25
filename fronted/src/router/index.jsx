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
import ShowSoft from "../pages/contorlPage/component/commentSoft.jsx";
import UserList from "../pages/contorlPage/component/userList.jsx";
// 新增：供应商详情页面
import SupplierProfile from "../pages/supplier/supplierProfile.jsx";
import CheckList from "../pages/contorlPage/component/CheckSoftList.jsx";
import SoftwareDetail from "../pages/detail/SoftwareDetail.jsx"; // 新增
import ManagerRouter from "../component/ProtectedRoute/manageRouter.jsx";
import Moresoft from "../pages/home/component/moresoft.jsx";
import CommentSection from "../component/CommentSection/CommentSection.jsx";
import EditorDetail from "../pages/publish/editor.jsx";

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
        //软件详情页面（一个开发商版，一个用户版，用户版再分为已购未购）\
        //! 禁用
        // path: "detail/:id",
        // element: <Detail />,
      },
      {
        //新的软件详情页面（统一的软件详情展示）
        path: "software/:id",
        element: <SoftwareDetail />,
      },
      {
        //供应商详情页面（新增）
        path: "supplier/:supplierId",
        element: <SupplierProfile />,
      },
      {
        //更多软件
        path: "more",
        element: <Moresoft />,
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
          {
            path: "editor",
            element: <EditorDetail />,
          },
        ],
      },
    ],
  },
  {
    //管理端路径
    path: "/manager",
    element: (
      <ManagerRouter>
        <ControlPage />
      </ManagerRouter>
    ),
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
        children: [],
      },
      {
        path: "comment/detail",
        element: <CommentSection />,
      },
      {
        path: "detail/:name",
        element: <CheckDetail />,
      },
    ],
  },
]);
