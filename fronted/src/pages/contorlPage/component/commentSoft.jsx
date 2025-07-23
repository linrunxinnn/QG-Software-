import BigCard from "../../../component/software/big_card";
import MediumCard from "../../../component/software/medium_card";
import SmallCard from "../../../component/software/small_card";
import Gap from "../../../component/software/gap";
import "./commentSoft.css"
import { useNavigate } from "react-router-dom";

const ShowCommentCard = () => {

    const navigate = useNavigate()
    function tocomment() {
        navigate("detail")
    }

    return (
        <>
            <Gap />
            <div className="Medium" onClick={() => tocomment()}>
                <MediumCard></MediumCard>
                <MediumCard></MediumCard>
                <MediumCard></MediumCard>
            </div>
            <Gap />
            <div className="Small" onClick={() => tocomment()}>
                <SmallCard></SmallCard>
                <SmallCard></SmallCard>
                <SmallCard></SmallCard>
                <SmallCard></SmallCard>
                <SmallCard></SmallCard>
                <SmallCard></SmallCard>
                <SmallCard></SmallCard>
                <SmallCard></SmallCard>
            </div>
            <div className="Big" onClick={() => tocomment()}>
                <BigCard></BigCard>
                <BigCard></BigCard>
            </div>
        </>
    )
}

export default ShowCommentCard