import AppLayout from "../component/AppLayout.tsx";
import MultiDisplay from "../component/MultiDisplay.tsx";

const HomePage = () => {
  console.log('hello world')
  return (
      <AppLayout>
        <MultiDisplay direction={'row'}>
          <div
              style={{width: '100%', alignItems: 'center', display: 'flex'}}
          >
            <img src='/logo.png' alt={'logo'}/>
          </div>
          <div style={{width: '100%'}}>하이</div>
        </MultiDisplay>
      </AppLayout>
  )
}

export default HomePage