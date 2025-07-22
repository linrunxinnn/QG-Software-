import BigCard from "../../../component/software/big_card";
import MediumCard from "../../../component/software/medium_card";
import SmallCard from "../../../component/software/small_card";
import Gap from "../../../component/software/gap";
import "./ShowSoft.css"

const ShowCard = () => {

    return (
        <div className="ShowCard">
            <Gap />
            <div className="Medium">
                <MediumCard></MediumCard>
                <MediumCard></MediumCard>
                <MediumCard></MediumCard>

            </div>
            <Gap />
            <div className="Small">
                <SmallCard></SmallCard>
                <SmallCard></SmallCard>
                <SmallCard></SmallCard>
                <SmallCard></SmallCard>
                <SmallCard></SmallCard>
                <SmallCard></SmallCard>
                <SmallCard></SmallCard>
                <SmallCard></SmallCard>
            </div>
            <div className="Big">
                <BigCard></BigCard>
                <BigCard></BigCard>
            </div>
        </div>
    )
}

export default ShowCard