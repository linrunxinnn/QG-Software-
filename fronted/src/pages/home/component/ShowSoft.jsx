import BigCard from "../../../component/software/big_card";
import MediumCard from "../../../component/software/medium_card";
import SmallCard from "../../../component/software/small_card";
import Gap from "../../../component/software/gap";
import "./ShowSoft.css"
import { useNavigate } from "react-router-dom";

const ShowCard = () => {

    //跳转到详情页
    const navigate = useNavigate()
    function todetail() {
        navigate("software/10")
    }
    const data = [
        [
            { sort: "娱乐" },
            {
                image: "https://picsum.photos/600/400?random=3",
                title: "抖音",
                price: "199.99"
            },
            {
                image: "https://picsum.photos/600/400?random=3",
                title: "微信",
                price: "299.99"
            },
            {
                image: "https://picsum.photos/600/400?random=3",
                title: "虎扑",
                price: "399.99"
            }
        ],
        [
            { sort: "娱乐" },
            {
                image: "https://picsum.photos/600/400?random=3",
                title: "抖音",
                price: "199.99"
            },
            {
                image: "https://picsum.photos/600/400?random=3",
                title: "微信",
                price: "299.99"
            },
            {
                image: "https://picsum.photos/600/400?random=3",
                title: "虎扑",
                price: "399.99"
            },
            {
                image: "https://picsum.photos/600/400?random=3",
                title: "快手",
                price: "399.99"
            },
            {
                image: "https://picsum.photos/600/400?random=3",
                title: "QQ",
                price: "399.99"
            }
        ],
        [
            { sort: "娱乐" },
            {
                image: "https://picsum.photos/600/400?random=3",
                title: "抖音",
                price: "199.99"
            },
            {
                image: "https://picsum.photos/600/400?random=3",
                title: "微信",
                price: "299.99"
            },
        ],
        [
            { sort: "娱乐" },
            {
                image: "https://picsum.photos/600/400?random=3",
                title: "抖音",
                price: "199.99"
            },
            {
                image: "https://picsum.photos/600/400?random=3",
                title: "微信",
                price: "299.99"
            },
        ]
    ];

    return (
        <div className="ShowCard">
            {/* 第一组卡片 */}
            <Gap sort={data[0][0].sort} />
            <div className="Medium" onClick={() => todetail()}>
                {data[0].slice(1).map((item, index) => (
                    <MediumCard
                        key={index}
                        image={item.image}
                        title={item.title}
                        price={item.price}
                    />
                ))}
            </div>

            {/* 第二组卡片 */}
            <Gap sort={data[1][0].sort} />
            <div className="Small" onClick={() => todetail()}>
                {data[1].slice(1).map((item, index) => (
                    <SmallCard
                        key={index}
                        image={item.image}
                        title={item.title}
                        price={item.price}
                    />
                ))}
            </div>

            <div className="Big" onClick={() => todetail()}>
                <BigCard
                    sort={data[2][0].sort}
                    titles={data[2].slice(1).map(item => item.title)}
                    prices={data[2].slice(1).map(item => item.price)}
                    images={data[2].slice(1).map(item => item.image)}
                />
                <BigCard
                    sort={data[3][0].sort}
                    titles={data[3].slice(1).map(item => item.title)}
                    prices={data[3].slice(1).map(item => item.price)}
                    images={data[3].slice(1).map(item => item.image)}
                />
            </div>

        </div>
    )
}

export default ShowCard