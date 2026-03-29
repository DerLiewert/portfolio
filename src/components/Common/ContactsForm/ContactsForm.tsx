import React, { type InputHTMLAttributes } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import './ContactsForm.scss';

type TypeFormMessage = 'success' | 'error' | 'sending' | null;

export const ContactsForm = ({ className }: { className?: string }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const messageTimeoutId = React.useRef<number>(null);

  const { t } = useTranslation('contacts-form');
  const [typeMessage, setTypeMessage] = React.useState<TypeFormMessage>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    setTypeMessage('sending');

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAIL_PUBLIC,
        },
      )
      .then(
        () => {
          setTypeMessage('success');

          if (messageTimeoutId.current) clearTimeout(messageTimeoutId.current);
          messageTimeoutId.current = setTimeout(() => {
            setTypeMessage(null);
          }, 3000);

          formRef.current?.reset();
        },
        (error) => {
          setTypeMessage('error');

          if (messageTimeoutId.current) clearTimeout(messageTimeoutId.current);
          messageTimeoutId.current = setTimeout(() => {
            setTypeMessage(null);
          }, 3000);

          console.log(t('form.error') + `\n\nError: ${error}`);
        },
      );
  };

  return (
    <form ref={formRef} className={clsx(className, 'form')} onSubmit={sendEmail}>
      <div className="form__fields-wrapper">
        <div className="form__field">
          <label>{t('form.name')}</label>
          <ControlledInput
            type="text"
            name="user_name"
            className="form__input"
            placeholder={t('form.namePlaceholder')}
          />
        </div>
        <div className="form__field">
          <label>{t('form.gmail')}</label>
          <ControlledInput
            type="email"
            name="user_email"
            className="form__input"
            placeholder="your.email@example.com"
            required
          />
        </div>
        <div className="form__field">
          <label>{t('form.subject')}</label>
          <ControlledInput
            type="text"
            name="subject"
            className="form__input"
            placeholder={t('form.subjectPlaceholder')}
            required
          />
        </div>
        <div className="form__field">
          <label>{t('form.message')}</label>
          <div className="form__textarea-wrapper">
            <ControlledTextArea
              name="message"
              className="form__textarea"
              placeholder={t('form.messagePlaceholder')}
            />

            {typeMessage && typeMessage !== 'sending' && (
              <p className={clsx('form__message', { _error: typeMessage === 'error' })}>
                {t(`form.${typeMessage}`)}
                <button
                  type="button"
                  onClick={() => {
                    if (messageTimeoutId.current) {
                      clearTimeout(messageTimeoutId.current);
                      setTypeMessage(null);
                    }
                  }}>
                  x
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="form__button-wrapper">
        <button className="form__button" disabled={typeMessage === 'sending'}>
          {t('form.send')}
        </button>
      </div>
    </form>
  );
};

const ControlledInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const [value, setValue] = React.useState('');
  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
};

const ControlledTextArea = (props: InputHTMLAttributes<HTMLTextAreaElement>) => {
  const [value, setValue] = React.useState('');
  return <textarea {...props} value={value} onChange={(e) => setValue(e.target.value)}></textarea>;
};
