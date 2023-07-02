import { FC } from 'react'
import {Field, Form, Formik} from 'formik'
import { FilterUsersReducerType } from '../../redux/reducers/usersReducer'

type SetSubmittingType = {
   setSubmitting: (isSubmitting: boolean) => void
}

type PropsType = {
   onFilterChanged: (filter: FilterUsersReducerType) => void
}

type FormValuesType = {
   term: string, friend: string
}

const UsersSearchForm: FC<PropsType> = ({onFilterChanged}) => {
    const submit = (
        values: FormValuesType,
        {setSubmitting}: SetSubmittingType) => {

        const filter: FilterUsersReducerType = {
            term: values.term,
            friend: values.friend === 'true'? true : values.friend === 'false' ? false : null
        }

        onFilterChanged(filter)

        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{term: '', friend: ''}}
                onSubmit={submit}>
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term" />

                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>

                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

 
export default UsersSearchForm