import PropTypes from 'prop-types';
import {
  ContactWrap,
  ContactListItem,
  ContactListBtn,
  Span,
} from './ContactList.styled';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ContactWrap>
      {contacts.map(({ id, name, number }) => {
        return (
          <ContactListItem key={id}>
            <Span>{name}:</Span>
            <Span>{number}</Span>

            <ContactListBtn type="button" onClick={() => onDelete(id)}>
              Delete
            </ContactListBtn>
          </ContactListItem>
        );
      })}
    </ContactWrap>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
  onDelete: PropTypes.func.isRequired,
};