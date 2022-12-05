export const Data = () => {
    const getUsers = async (usersCollectionRef, getDocs) => {
        const data = await getDocs(usersCollectionRef)
        return (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    return {
        getUsers,
    }
}

export default Data;