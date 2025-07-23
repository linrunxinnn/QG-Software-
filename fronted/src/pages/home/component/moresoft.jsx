import axios from 'axios'; // 导入 axios
import MediumCard from "../../../component/software/medium_card";
import { useEffect, useState } from "react";

const Moresoft = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/softwares/SearchSoftwareType');
                setData(response.data); // 更新状态
            } catch (error) {
                console.error('请求失败:', error);
            }
        };

        fetchData();
    }, []);

    return (
        // <>
        //     {data.length > 0 ? (
        //         data.map((item, index) => (
        <MediumCard />
        //         ))
        //     ) : (
        //         <p>数据加载中...</p> // 如果数据为空或正在加载时，显示提示信息
        //     )}
        // </>
    );
}

export default Moresoft;
