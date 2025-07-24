import BigCard from "../../../component/software/big_card";
import MediumCard from "../../../component/software/medium_card";
import SmallCard from "../../../component/software/small_card";
import Gap from "../../../component/software/gap";
import "./showSoft.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSortFromAPI } from '../../../api/service/userService';  // 引入封装好的请求函数


const ShowCommentCard = () => {

    const navigate = useNavigate()
    function tocomment() {
        navigate("detail")
    }

    const [data, setData] = useState([]);  // 存储返回的数据
    //要连接时再注释掉
    // //当组件被挂载时，按类别发送请求
    // useEffect(() => {
    //     const types = ['健康', '教育', '运动', '办公'];  // 请求不同类型的数据
    //     const fetchAllSort = async () => {
    //         try {
    //             const allData = await Promise.all(
    //                 types.map((type) => fetchSortFromAPI(type))  // 同时发送多个请求
    //             );

    //             // 格式化后的数据被返回为一个二维数组，合并成一个数组
    //             setData(allData.flat());
    //         } catch (error) {
    //             console.error('获取数据失败:', error);
    //         }
    //     };
    //     fetchAllSort();
    // }, []);
    useEffect(() =>
        //示例数据
        setData([
            // 健康
            [
                { picture: "https://picsum.photos/600/400?random=3", name: "产品1", price: "99.99" },
                { picture: "https://picsum.photos/600/400?random=3", name: "产品2", price: "199.99" }
            ],
            // 教育
            [
                { picture: "https://picsum.photos/600/400?random=3", name: "产品1", price: "99.99" },
                { picture: "https://picsum.photos/600/400?random=3", name: "产品2", price: "199.99" }
            ],
            // 运动
            [
                { picture: "https://picsum.photos/600/400?random=3", name: "产品1", price: "99.99" },
                { picture: "https://picsum.photos/600/400?random=3", name: "产品2", price: "199.99" }
            ],
            // 办公
            [
                { picture: "https://picsum.photos/600/400?random=3", name: "产品1", price: "99.99" },
                { picture: "https://picsum.photos/600/400?random=3", name: "产品2", price: "199.99" }
            ]
        ]), []);


    return (
        <div className="ShowCard">
            {/* 第一组卡片 - 健康 */}
            {data.length > 0 && (
                <div>
                    <Gap sort={"健康"} />
                    <div className="Medium" onClick={() => tocomment()}>
                        {data[0].map((item, index) => (
                            <MediumCard
                                key={index}
                                image={item.picture}
                                title={item.name}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* 第二组卡片 - 教育 */}
            {data.length > 1 && (
                <div>
                    <Gap sort={"教育"} />
                    <div className="Small" onClick={() => tocomment()}>
                        {data[1].map((item, index) => (
                            <SmallCard
                                key={index}
                                image={item.picture}
                                title={item.name}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* 第三组和第四组卡片 - 运动和办公 */}
            {data.length > 2 && (
                <div className="Big" onClick={() => tocomment()}>
                    <BigCard
                        sort={"运动"}
                        titles={data[2].map((item) => item.name)}
                        prices={data[2].map((item) => item.price)}
                        images={data[2].map((item) => item.picture)}
                    />
                    <BigCard
                        sort={"办公"}
                        titles={data[3].map((item) => item.name)}
                        prices={data[3].map((item) => item.price)}
                        images={data[3].map((item) => item.picture)}
                    />
                </div>
            )}
        </div>
    );

}

export default ShowCommentCard