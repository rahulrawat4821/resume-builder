import ClassicTheme from './themes/ClassicTheme'
import ModernTheme from './themes/ModernTheme'
import ExecutiveTheme from './themes/ExecutiveTheme'

const ResumePreview = ({ data, theme = 'classic' }) => {
  switch (theme) {
    case 'modern': return <ModernTheme data={data} />
    case 'executive': return <ExecutiveTheme data={data} />
    default: return <ClassicTheme data={data} />
  }
}

export default ResumePreview