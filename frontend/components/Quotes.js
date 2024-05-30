import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setHighlightedQuote,
  toggleVisibility,
} from '../state/quotesSlice'
import { useGetQuotesQuery, useToggleQuoteMutation, useDeleteQuoteMutation } from '../state/quotesApi'

export default function Quotes() {
  const { data: quotes, isLoading: gettingQuotes, isFetching: refreshQuotes } = useGetQuotesQuery()
  const [toggleQuote, { isLoading: togglingQuote }] = useToggleQuoteMutation()
  const [deleteQuote, { isLoading: deletingQuote }] = useDeleteQuoteMutation()
  const displayAllQuotes = useSelector(st => st.quotesState.displayAllQuotes)
  const highlightedQuote = useSelector(st => st.quotesState.highlightedQuote)
  const dispatch = useDispatch()
  return (
    <div id="quotes">
      <h3>
        Quotes
        {deletingQuote && ' deleting is in progress...'}
        {togglingQuote && ' being toggled...'}
        {(gettingQuotes || refreshQuotes) && ' loading...'}
      </h3>
      <div>
        {
          quotes?.filter(qt => {
            return displayAllQuotes || !qt.apocryphal
          })
            .map(qt => (
              <div
                key={qt.id}
                className={`quote${qt.apocryphal ? " fake" : ''}${highlightedQuote === qt.id ? " highlight" : ''}`}
              >
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
                <div className="quote-buttons">
                  <button onClick={() => deleteQuote(qt.id)} >DELETE</button>
                  <button onClick={() => dispatch(setHighlightedQuote(qt.id))}>HIGHLIGHT</button>
                  <button onClick={() => toggleQuote({ id: qt.id, quote: { apocryphal: !qt.apocryphal } })} >FAKE</button>
                </div>
              </div>
            ))
        }
        {
          !quotes?.length && "No quotes here! Go write some."
        }
      </div>
      {!!quotes?.length && <button onClick={() => dispatch(toggleVisibility())}>
        {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
      </button>}
    </div>
  )
}
