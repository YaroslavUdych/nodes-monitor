import './App.css'

import { Field, FieldLabel } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'

export const App = () => {
	return (
		<>
			<h1 className="text-lg">Just checking if everything works</h1>

			<Field orientation="horizontal">
				<Switch id="switch" />
				<FieldLabel htmlFor="switch">Switch</FieldLabel>
			</Field>
		</>
	)
}
