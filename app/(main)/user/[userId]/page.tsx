interface UserPageProps {
  params: {
    userId: string
  }
}

const UserPage = ({ params: { userId } }: UserPageProps) => {
  return <div>{userId}</div>
}

export default UserPage
