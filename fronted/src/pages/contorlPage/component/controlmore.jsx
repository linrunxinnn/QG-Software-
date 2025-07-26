import api from "../../../api/index"; // 导入 axios
import MediumCard from "../../../component/software/medium_card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./controlmore.module.css"; // 导入样式文件
import { Empty } from "antd";
import { Alert, Flex, Spin } from "antd";

const ControlMoresoft = () => {
    const [data, setData] = useState([]);
    const typeMap = {
        1: "健康",
        2: "教育",
        3: "运动",
        4: "办公",
        5: "其他",
    };
    const type = typeMap[window.location.pathname.split("/").pop()]; // 获取当前类型
    console.log("111", typeMap[window.location.pathname.split("/").pop()]);
    console.log("当前类型:", type); // 打印当前类型以便调试
    const navigate = useNavigate();
    function tocomment(id) {
        console.log("跳转到评论页面，ID:", id);
        navigate(`/manager/comment/${id}`);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/softwares/SearchSoftwareType", {
                    params: { type },
                });
                setData(response.data.data); // 更新状态
                console.log("获取到的数据:", response.data.data);
            } catch (error) {
                console.error("请求失败:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={style.moresoftList}>
            {data !== null && data.length > 0 ? (
                data.map((item) => (
                    <MediumCard
                        className={style.item}
                        image={item.image}
                        id={item.id}
                        title={item.name}
                        price={item.price}
                        onClick={() => tocomment(item.id)}
                    />
                ))
            ) : data === null ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className={style.empty} />
            ) : (
                <Spin tip="Loading..." className={style.loading}></Spin>
            )}
        </div>
    );
};

export default ControlMoresoft;
