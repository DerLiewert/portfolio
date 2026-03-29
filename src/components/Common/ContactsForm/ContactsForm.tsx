import React from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import { INPUT_NAMES } from '@/typescript';
import type { FormData, InputName, TypeFormMessage } from '@/typescript';
import { initialFormData } from '@/constants';
import clsx from 'clsx';
import './ContactsForm.scss';

export const ContactsForm = ({ className }: { className?: string }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const messageTimeoutId = React.useRef<number>(null);

  const { t } = useTranslation('contacts-form');
  const [typeMessage, setTypeMessage] = React.useState<TypeFormMessage>(null);
  const [formData, setFormData] = React.useState<FormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name as InputName]: value }));
  };

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

          setFormData(initialFormData);
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
          <input
            className="form__input"
            type="text"
            name={INPUT_NAMES.user_name}
            value={formData[INPUT_NAMES.user_name]}
            placeholder={t('form.namePlaceholder')}
            onChange={handleChange}
          />
        </div>
        <div className="form__field">
          <label>{t('form.gmail')}</label>
          <input
            className="form__input"
            type="email"
            name={INPUT_NAMES.user_email}
            value={formData[INPUT_NAMES.user_email]}
            placeholder="your.email@example.com"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form__field">
          <label>{t('form.subject')}</label>
          <input
            className="form__input"
            type="text"
            name={INPUT_NAMES.subject}
            value={formData[INPUT_NAMES.subject]}
            placeholder={t('form.subjectPlaceholder')}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form__field">
          <label>{t('form.message')}</label>
          <div className="form__textarea-wrapper">
            <textarea
              className="form__textarea"
              name={INPUT_NAMES.message}
              value={formData[INPUT_NAMES.message]}
              placeholder={t('form.messagePlaceholder')}
              onChange={handleChange}
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
