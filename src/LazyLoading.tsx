import Loader from '@ui/common/atoms/Spinner'
import { Suspense } from 'react'

const LazyLoading = (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  )

export default LazyLoading
