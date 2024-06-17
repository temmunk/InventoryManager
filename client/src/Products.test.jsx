import { describe, expect, it } from 'vitest'
import  Products  from './pages/Products'
import { render, screen} from '@testing-library/react'

describe('Products', () => {
    it('Products', () => {
        render(<Products />)

        expect(screen.getByText('Products')).toBeDefined()
    })
})
