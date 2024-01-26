import { FC } from 'react';
import { useDropzone, Accept, FileRejection } from 'react-dropzone';
import styles from './fileUploader.module.scss';
import { Check2, ExclamationCircleFill, FileEarmark } from 'react-bootstrap-icons';

interface FileUploaderProps {
  acceptTypes: Accept;
  maxFiles?: number;
  maxSize?: number;
  fileUploaded?: File | null | string | any;
  label?: string;
  onFileChange: Function;
  error?: boolean | string;
  customId?: string;
  showErrorIcon?: boolean;
  showAdmitFiles?: boolean;
}

const dropZoneClassName = (error: string | boolean | undefined, fileRejections: FileRejection[]) =>
  error || fileRejections.length ? styles.dropZoneContainerError : styles.dropZoneContainer;

const admitFilesText = (acceptedTypes: string[]) =>
  `Admite archivos ${acceptedTypes.length ? acceptedTypes.join(', ').replaceAll('.', '') : ''}`;

const fileUploadedName = (fileUploaded: File | string | any) => {
  if (typeof fileUploaded === 'string') {
    return fileUploaded;
  } else {
    return fileUploaded.name;
  }
};

const FileUploader: FC<FileUploaderProps> = ({
  acceptTypes,
  maxFiles = 1,
  maxSize = 2 * 1000 * 1000,
  fileUploaded,
  label,
  onFileChange,
  error,
  customId = '',
  showErrorIcon = false,
  showAdmitFiles = true,
}) => {
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: acceptTypes,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length === 1) {
        onFileChange(acceptedFiles[0]);
      }
    },
    maxFiles,
    maxSize,
  });

  const acceptedTypes = Object.keys(acceptTypes).map(key => {
    return acceptTypes[key].join(', ');
  });

  const fileTooLargeMessage =
    fileRejections.length && fileRejections.some(i => i.errors.find(item => item.code === 'file-too-large'))
      ? `Tamaño máximo ${(maxSize / 1000000).toFixed(1)} MB`
      : '';
  const forbiddenTyeMessage =
    fileRejections.length && fileRejections.some(i => i.errors.find(item => item.code === 'file-invalid-type'))
      ? 'Archivo no permitido'
      : '';
  const tooManyFilesMessage =
    fileRejections.length && fileRejections.some(i => i.errors.find(item => item.code === 'too-many-files'))
      ? `Cantidad máxima de archivos: ${maxFiles}`
      : '';

  return (
    <div className={styles.container} id={customId}>
      <p>{label}</p>
      {!fileUploaded ? (
        <>
          <section className={dropZoneClassName(error, fileRejections)}>
            <div {...getRootProps({ className: 'dropzone w-100 h-100 d-flex flex-column justify-content-center' })}>
              <input {...getInputProps()} />
              <p>
                {`Arrastra tu archivo o `}
                <span>{'cárgalo desde tu dispositivo'}</span>
              </p>
            </div>
          </section>
          {showAdmitFiles && (
            <aside>
              <p>{admitFilesText(acceptedTypes)}</p>
            </aside>
          )}
        </>
      ) : (
        <>
          <div className={styles.uploadedFile}>
            <p>
              <FileEarmark className={styles.fileIcon} size={18} />
              {fileUploadedName(fileUploaded)}
              {!showErrorIcon ? (
                <Check2 className={styles.check} color="rgba(8, 135, 93, 1)" size={25} />
              ) : (
                <ExclamationCircleFill className={styles.errorIcon} />
              )}
            </p>
            {!showErrorIcon ? (
              <span className={styles.blueStatusBar}></span>
            ) : (
              <span className={styles.redStatusBar}></span>
            )}
          </div>
          <aside>
            <p className={styles.clickable} onClick={() => onFileChange(null)}>
              {'Eliminar'}
            </p>
          </aside>
        </>
      )}
      {(error || forbiddenTyeMessage || fileTooLargeMessage || tooManyFilesMessage) && (
        <div className={styles.errorMesage}>
          <p>
            <ExclamationCircleFill className="me-1" />
            {error === true
              ? 'Este campo es requerido.'
              : tooManyFilesMessage || forbiddenTyeMessage || fileTooLargeMessage || error}
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
