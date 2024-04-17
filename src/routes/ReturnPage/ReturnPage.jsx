import { Accordion, Breadcrumbs } from '../../components'
import { returnData } from '../../utils'

export const ReturnPage = () => {
  return (
    <main className="main">
      <header className="header-info" >
        <Breadcrumbs current={"повернення"} />
        <h1 className="heading" >повернення та обмін</h1>
      </header>
      {
        returnData?.map(({ title, content }) => {
          return (
            <Accordion title={title} content={content} key={title} />
          )
        })
      }
    </main>
  )
}
