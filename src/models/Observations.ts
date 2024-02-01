interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | any;
  size: number;
  width: number;
  height: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
}

interface ImageAttributes {
  attributes: {
    id: number;
    name: string;
    alternativeText: null | any;
    caption: null | any;
    width: number;
    height: number;
    formats: {
      small: ImageFormat;
      medium: ImageFormat;
      large: ImageFormat;
      thumbnail: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null | any;
    provider: string;
    provider_metadata: {
      public_id: string;
      resource_type: string;
    };
    createdAt: string;
    updatedAt: string;
  };
}

interface ConsultationAttributes {
  comments: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: string;
  since: string;
  until: string;
  notifyCustomer: boolean;
  notifyUser: boolean;
}

interface ConsultationData {
  data: {
    id: number;
    attributes: ConsultationAttributes;
  };
}

interface MeasurementsAttributes {
  highWaist: number;
  mean: number;
  navelLine: number;
  lowerBelly: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface MeasurementsData {
  data: {
    id: number;
    attributes: MeasurementsAttributes;
  };
}

interface Attributes {
  observationsConsultation: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  consultation: ConsultationData;
  images: {
    data: ImageAttributes[];
  };
  measurements: MeasurementsData;
}

export interface ConsultationObservation {
  id: number;
  attributes: Attributes;
}

export interface ObservationCreate {
  consultation: string | number;
  observationsConsultation: string;
  measurements: string | null | number;
}

export interface MeasurementsCreate {
  consultation: string | number;
  customer: string | number;
  highWaist: number | null | undefined;
  mean: number | null | undefined;
  navelLine: number | null | undefined;
  lowerBelly: number | null | undefined;
}

export interface ObservationEdit {
  observationId: string | number;
  observationsConsultation: string;
  measurements?: null | number;
}

export interface MeasurementsEdit {
  measurementsId: string | number;
  highWaist: number | null | undefined;
  mean: number | null | undefined;
  navelLine: number | null | undefined;
  lowerBelly: number | null | undefined;
}
