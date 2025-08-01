import BigCard from "../../../component/software/big_card";
import MediumCard from "../../../component/software/medium_card";
import SmallCard from "../../../component/software/small_card";
import Gap from "../../../component/software/gap";
import "./showSoft.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSortFromAPI } from "../../../api/service/userService"; // 引入封装好的请求函数

const ShowCommentCard = () => {
  const navigate = useNavigate();
  function tocomment(id) {
    console.log("跳转到评论页面，ID:", id);
    navigate(`/software/${id}`);
  }
  const typeMap = {
    1: "健康",
    2: "教育",
    3: "运动",
    4: "办公",
    5: "更多",
  };

  const [data, setData] = useState([]); // 存储返回的数据

  // 当组件挂载时，发送请求
  useEffect(() => {
    const types = ['健康', '教育', '运动', '办公']; // 请求不同类型的数据

    const fetchAllSort = async () => {
      try {
        // 使用 Promise.all 并行请求所有类别
        const allData = await Promise.all(
          types.map((type) => fetchSortFromAPI(type)) // 同时发送多个请求
        );

        // 合并所有数据并格式化

        // 确保所有请求返回后，再更新 data
        console.log(allData);

        setData(allData);
        console.log(data);

      } catch (error) {
        console.error('获取数据失败:', error);
      }
    };

    fetchAllSort();
  }, []); // 空数组意味着只在组件挂载时执行一次


  // useEffect(
  //   () =>
  //     //示例数据
  //     setData([
  //       // 健康
  //       [
  //         {
  //           id: 1,
  //           picture: "https://picsum.photos/600/400?random=3",
  //           name: "产品1",
  //           price: "99.99",
  //         },
  //         {
  //           id: 2,
  //           picture: "https://picsum.photos/600/400?random=3",
  //           name: "产品2",
  //           price: "199.99",
  //         },
  //       ],
  //       // 教育
  //       [
  //         {
  //           id: 3,
  //           picture: "https://picsum.photos/600/400?random=3",
  //           name: "产品1",
  //           price: "99.99",
  //         },
  //         {
  //           id: 4,
  //           picture: "https://picsum.photos/600/400?random=3",
  //           name: "产品2",
  //           price: "199.99",
  //         },
  //       ],
  //       // 运动
  //       [
  //         {
  //           id: 5,
  //           picture: "https://picsum.photos/600/400?random=3",
  //           name: "产品1",
  //           price: "99.99",
  //         },
  //         {
  //           id: 6,
  //           picture: "https://picsum.photos/600/400?random=3",
  //           name: "产品2",
  //           price: "199.99",
  //         },
  //       ],
  //       // 办公
  //       [
  //         {
  //           id: 7,
  //           picture: "https://picsum.photos/600/400?random=3",
  //           name: "产品1",
  //           price: "99.99",
  //         },
  //         {
  //           id: 8,
  //           picture: "https://picsum.photos/600/400?random=3",
  //           name: "产品2",
  //           price: "199.99",
  //         },
  //       ],
  //     ]),
  //   []
  // );

  //跳转用item的id进行拼接
  return (
    <div className="ShowCard">
      {/* 第一组卡片 - 健康 */}
      {data.length > 0 && (
        <div>
          <Gap sort={typeMap[1]} sortId={1} />
          <div className="Medium">
            {data[0].map((item) => (
              <MediumCard
                key={item.id}
                image={item.picture}
                title={item.name}
                price={item.price}
                onClick={() => tocomment(item.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 第二组卡片 - 教育 */}
      {data.length > 1 && (
        <div>
          <Gap sort={typeMap[2]} sortId={2} />
          <div className="Small">
            {data[1].map((item) => (
              <SmallCard
                key={item.id}
                image={item.picture}
                title={item.name}
                price={item.price}
                onClick={() => tocomment(item.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 第三组和第四组卡片 - 运动和办公 */}
      {data.length > 2 && (
        <div className="Big">
          <BigCard
            sort={typeMap[3]}
            titles={data[2].map((item) => item.name)}
            prices={data[2].map((item) => item.price)}
            images={data[2].map((item) => item.picture)}
            id={data[2].map((item) => item.id)}
            onClick={tocomment}
            sortId={3}
          />
          <BigCard
            sort={typeMap[4]}
            titles={data[3].map((item) => item.name)}
            prices={data[3].map((item) => item.price)}
            images={data[3].map((item) => item.picture)}
            id={data[3].map((item) => item.id)}
            onClick={tocomment}
            sortId={4}
          />
        </div>
      )}
    </div>
  );
};

export default ShowCommentCard;
