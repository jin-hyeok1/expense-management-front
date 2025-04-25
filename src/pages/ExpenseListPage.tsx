import {DefaultFrame} from "../component/DefaultFrame.tsx";
import ContentBox from "../component/ContentBox.tsx";
import {ExpenseCard} from "../component/ExpenseCard.tsx";
import {useUser} from "../hooks/UserContext.tsx";


const ExpenseListPage = () => {
    const user = useUser();
    return (
        <DefaultFrame>
            <ContentBox title={`${user?.name} 님의 경비 등록 현황`}>
                <ExpenseCard
                    title={'임의 지정'}
                    amount={30000} key={1}
                    count={3}
                    date={'2024-12-12'}
                    onActionClick={(value: string) => console.log(value)}
                    status={{name: 'CREATED', displayValue: '생성'}}
                />
            </ContentBox>
        </DefaultFrame>
    )
}
export default ExpenseListPage